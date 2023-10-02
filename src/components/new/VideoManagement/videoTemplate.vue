<template>
    <div class="box">
        <div class="videoinfo" v-for="p, index in tablePage.showPage">
            <video @click="videoStop(index)" @mouseenter="playVid(index)" ref="renameRef" style="width: 380px;"
                :src=p.file_name preload="Metadata" controlslist="nodownload" disablepictureinpicture>
            </video>
            <div class="cont">
                <button class="FilledButton base_class"><span @click="ModifyInfo(index)">修改信息</span></button>
                <button class="FilledButton base_class"><span @click="DeleteInfo(index)">删除作品</span></button>
            </div>
        </div>
            <div class="pagination">
            <el-pagination 
            layout="pager, jumper"
            background :current-page="tablePage.pageNum" :page-size="tablePage.pageSize"
            :total="tablePage.tableData.length" @size-change="handleSizeChange" @current-change="handlePageChange" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.box::-webkit-scrollbar {
    width: 5px;
    height: 5px;

}

.box::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom right, #4d7fff 0%, #1a56ff 100%);
    border-radius: 5px;
}

.box {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    display: flex;
    overflow: scroll;

    overflow-x: hidden;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;






    .videoinfo {
        width: 380px;
        height: 550px;
        margin: 0px 30px 100px;
        position: relative;
        background: #000;
        border-radius: 8px;

        video {
            max-height: 100%;
            margin: 0 auto;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            object-fit: fill;
            border-radius: 8px;
        }

        .cont {
            position: absolute;
            width: 100%;
            height: 60px;
            background-color: #1A1B1B;
            top: 570px;
            display: flex;
            flex-direction: row;
            align-content: space-around;
            justify-content: space-around;
            flex-wrap: wrap;

            .FilledButton {
                width: 100px;
                height: 40px;
                cursor: pointer;
                position: relative;
                background-color: #0b0b0b;
                border: none;
                border-radius: 5px;
                color: #fff;
            }

            // .base_class::after{
            //     content: '';
            //     position: absolute;
            //     cursor: pointer;
            //     border-radius: 5px;
            //     border: none;
            //     inset: 0px;
            //     border: 2px solid transparent;
            //     background: linear-gradient(90.36deg,#AD00FF 0.31%,#330371 104.9%) border-box;
            //     -webkit-mask: linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px);
            //     -webkit-mask-composite: destination-out;
            // }
            .FilledButton:hover {
                // background: linear-gradient(120.55deg, #330371 18.56%, #AD00FF 98.01%);
            }
        }


    }
}
</style>
<script setup  >
import  {useVwSize}  from "@/hooks/videoHome"

const {tablePage,videoStop,playVid,renameRef,handlePageChange,handleSizeChange,ModifyInfo,DeleteInfo} = useVwSize()
console.log('useVwSuseVwSizeuseVwSizeize',tablePage);
































// export default {

         
      
//         // jump[0].nodeValue = "给我去第"
//         const renameRef = ref(null)
//         const router = useRouter()

//         //
//         const handlePageChange = function (currentPage) {
//             console.log('currentPage', currentPage);

//             if (tablePage.pageNum <= tablePage.total) {
//                 page(currentPage)
//             }
//         }
//         const handleSizeChange = function (pageSize) {
//             console.log('每页多少条', pageSize);
            
//         }
//         const one = function () { console.log('顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶我出发'); }
//         data.videoElement = document.getElementsByTagName('video')
//         const videoElement = data.videoElement
//         const ModifyInfo = function (index) {
//             for (var i = 0; i < data.video_info.length; i++) {
//                 if (i === index) {
//                     console.log(tablePage.showPage[index]);
//                     router.push({
//                         name: 'uploadHome',
//                         params: {
//                             code: 0,
//                             data: JSON.stringify(tablePage.showPage[index])
//                         }
//                     })
//                 }
//             }

//         }
//        
//        
//         
//         return { data, router, playVid, renameRef, videoStop, ModifyInfo, page, handlePageChange, one, handleSizeChange, tablePage, }
//     },

// }
















   
</script>


