# Mongoose timezone correction

This mongoose plugin save all Date type props to local timezone of server.

## Usage

```mermaid
SampleSchema.plugins(require("mongoose-ts-timezone");
```

## Attention: 

This plugin save local time as UTC timezone

Sample:

> System time => 18:15:00.000 +3:30 (Asia/Tehran)

> Saved in Mongo => 18:15:00.000 0:00 (UTC)
