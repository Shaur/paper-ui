import {LinearProgress, Stack} from "@mui/material";
import {DiskInfoWidgetProperties} from "./DiskInfoWidgetProperties";

function DiskInfoWidget(data: DiskInfoWidgetProperties) {
    return (
        <Stack direction='column' textAlign='center' width={150}>
            <div>{data.diskInfo?.usable ?? 0.0}GB of {data.diskInfo?.total ?? 0}GB</div>
            <LinearProgress
                variant='determinate'
                value={(data.diskInfo !== undefined) ? data.diskInfo?.usable / data.diskInfo?.total * 100 : 0}
            />
        </Stack>
    )
}

export default DiskInfoWidget