import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { BoardSections as BoardSectionsType, Status } from './types';
import { getTaskById } from './utils/tasks';
import { findBoardSectionContainer, initializeBoard } from './utils/board';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BOARD_SECTIONS } from './constants';
import Container from '@/app/components/Container';

const BoardSectionList = ({Leads, currentUser, disableEditing, owner}: any) => {
  const tasks = Leads;
  const router = useRouter();
  const initialBoardSections = initializeBoard(Leads);
  const [boardSections, setBoardSections] = useState<BoardSectionsType>(initialBoardSections);
  useEffect(() => {
    setBoardSections(initialBoardSections)
  },[tasks])
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );



  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );


    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];
      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);
      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    const task = boardSections[activeContainer].filter(
      (task) => task.id === active.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    task[0].stage = overContainer as Status
    axios.post(`/api/leads/${active.id}`, {
      stage: overContainer,
    }).then(() => {
      router.refresh();
    })
    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };
  
  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;


  return (
    <div className='py-20 xl:px-1'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='flex w-full container'>
          {Object.keys(boardSections).map((boardSectionKey) => {
            return (
              <div className='grid w-full ' key={boardSectionKey}>
                <BoardSection
                  currentUser={currentUser}
                  id={boardSectionKey}
                  title={BOARD_SECTIONS[boardSectionKey]}
                  tasks={boardSections[boardSectionKey]}
            
                />
              </div>
            )
          })}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem currentUser={currentUser} task={task} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default BoardSectionList;
