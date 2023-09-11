type BoardSectionBtnProps = {
    title: any;
    tasksLength: any,
    bgColor: any,
};


const BoardSectionBtn = ({title, tasksLength, bgColor}: BoardSectionBtnProps) => {
   return(
    <h2 className={`mb-2 w-full p-2 bg-[${bgColor}] max-h-16 rounded-2xl text-center text-sm`}>
        {title} ({tasksLength})
    </h2>
   )
}

export default BoardSectionBtn