import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from './types';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
  currentUser: SafeUser,
  owner?: any
};

const BoardSection = ({ id, title, tasks, currentUser,}: BoardSectionProps) => {

  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div>
        <h2 className={`mb-1 w-full p-2 bg-[#191923] max-h-16 text-white font-bold shadow rounded-r-2xl text-center text-sm`}>
          {title} ({tasks.length})
        </h2>
      <div className={"top-0 h-[600px] relative flex-grow overflow-y-auto bg-transparent gap-px border-l-2 max-h-[700px] border-dotted border-black shadow-l"}>
        <SortableContext
          id={id}
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef}>
            {tasks.map((task) => (
              <div className='mb-2 pr-2' key={task.id}>
                <SortableTaskItem id={task.id}>
                  <TaskItem currentUser={currentUser} task={task} />
                </SortableTaskItem>
              </div>
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default BoardSection;
