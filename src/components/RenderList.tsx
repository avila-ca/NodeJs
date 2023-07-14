import { TodoTask } from "../App";

interface Props {
    task:TodoTask,
}

export const RenderList= ({task}:Props) => {

    return(
        <>
            <span>{task.idNumber}{ task.taskName}</span>
        </>
    )
}