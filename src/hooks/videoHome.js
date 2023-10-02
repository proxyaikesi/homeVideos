
import axios from 'axios'
import { useRouter } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
var timestamps = require('moment-timezone');
import { useStore } from 'vuex'
import { ref, reactive, onBeforeMount, } from "vue";

export function useVwSize() {
    const data = reactive({
        name: '张三',
        age: 18,
        video_info: '111',
        isShow: false,
        videoElement: [],
    })

    const tablePage = reactive({
        pageNum: 1, // 第几页
        pageSize: 2, // 每页多少条
        total: 0, // 总记录数
        showPage: [],       // 每页展示的数据
        tableData: [],
    })
    zhCn.el.pagination = {
        goto: '向前',
        pageClassifier: '✌'
    }
    const renameRef = ref(null)
    const store = useStore()
    const $router = useRouter()
    const route = $router.currentRoute.value.name
    onBeforeMount(() => {
        axios.post(`http://localhost:3000/${route == 'videoManage' ? 'videoManage' : 'unpublished'}`, {
            params: {
                id: store.state.userInfo._id
            }
        }).then((response) => {
            data.video_info = response.data.newdata
            console.log('response.data.newdata', response.data.newdata);
            tablePage.tableData = data.video_info
            tablePage.total = Math.ceil(data.video_info.length / tablePage.pageSize);
            page(tablePage.pageNum)
            data.video_info.sort((a, b) => {
                if (a['VideoHV'] != b['VideoHV']) {
                    return b['VideoHV'].localeCompare(a['VideoHV']);
                }
            })
        })
    });

    const handlePageChange = function (currentPage) {
        console.log('currentPage', currentPage);

        if (tablePage.pageNum <= tablePage.total) {
            page(currentPage)
        }
    }
    const handleSizeChange = function (pageSize) {
        console.log('每页多少条', pageSize);

    }
    const page = function (num) {
        console.log('num', num);
        tablePage.pageNum = num
        var list = (tablePage.pageNum - 1) * tablePage.pageSize;
        tablePage.showPage = tablePage.tableData.slice(list, list + tablePage.pageSize);
    }

    const getViewportSize = () => {
        data.width = document.body.clientWidth;
        data.height = document.body.clientHeight;
    }
    data.videoElement = document.getElementsByTagName('video')
    const videoElement = data.videoElement
    const ObtainI = function (index) {
        for (var i = 0; i < data.video_info.length; i++) {
            if (i === index) {
                return JSON.stringify(tablePage.showPage[index])
            }

        }

    }
    const ModifyInfo = function (index) {
        $router.push({
            name: 'uploadHome',
            params: {
                code: 0,
                data: ObtainI(index)
            }
        })
    }

    const DeleteInfo = function(index){
        axios.post('http://localhost:3000/deleteVideoInfo',{
            params:{
                videoinfo:ObtainI(index)
            }
        }).then((res)=>{
            let newarr = JSON.parse(res.data.aa.videoinfo)
            console.log(newarr.classify);
        })
        console.log(ObtainI(index));
    }

    const playVid = function (fs) {
        if (videoElement && videoElement.length > 0) {
            for (let i = 0; i < videoElement.length; i++) {
                if (i === fs) {
                    videoElement[i].play() instanceof Promise
                } else {
                    videoElement[i].pause()
                }
            }
        }
    }
    const videoStop = function (fs) {
        let newIndex = renameRef._value[fs]
        newIndex.pause()
    }

    return {
        getViewportSize, tablePage, data, page, playVid, videoStop, 
        renameRef, handlePageChange, handleSizeChange, ModifyInfo,DeleteInfo
    }
}