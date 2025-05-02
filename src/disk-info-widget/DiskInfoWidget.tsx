import {LinearProgress, Stack} from "@mui/material";
import {DiskInfoWidgetProperties} from "./DiskInfoWidgetProperties";

function DiskInfoWidget(data: DiskInfoWidgetProperties) {
    const usable = (data.diskInfo?.usable ?? 0.0).toFixed(2)
    const total = (data.diskInfo?.total ?? 0).toFixed(2)
    return (
        <Stack direction='column' textAlign='center' width={150}>
            <div>{usable}GB of {total}GB</div>
            <LinearProgress
                variant='determinate'
                value={(data.diskInfo !== undefined) ? data.diskInfo?.usable / data.diskInfo?.total * 100 : 0}
            />
        </Stack>
    )
}

export default DiskInfoWidget