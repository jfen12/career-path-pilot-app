import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import JobCard from './JobCard';

interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  postedDate: string;
  tags?: string[];
  description?: string;
}

interface Column {
  id: string;
  title: string;
  items: JobItem[];
}

const initialData: JobItem[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$150k - $180k',
    postedDate: '2 days ago',
    tags: ['React', 'TypeScript', 'Remote'],
    description: 'Looking for an experienced frontend developer to join our growing team.'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupX',
    location: 'New York, NY',
    salary: '$130k - $160k',
    postedDate: '1 week ago',
    tags: ['Node.js', 'React', 'MongoDB'],
    description: 'Join our fast-paced startup and help build the future of fintech.'
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'DataCo',
    location: 'Remote',
    salary: '$140k - $170k',
    postedDate: '3 days ago',
    tags: ['Python', 'Django', 'AWS'],
    description: 'Help us scale our data processing infrastructure.'
  }
];

const initialColumns: { [key: string]: Column } = {
  wishlist: {
    id: 'wishlist',
    title: 'Wishlist',
    items: [initialData[0]]
  },
  applied: {
    id: 'applied',
    title: 'Applied',
    items: [initialData[1]]
  },
  interview: {
    id: 'interview',
    title: 'Interview',
    items: [initialData[2]]
  },
  offer: {
    id: 'offer',
    title: 'Offer',
    items: []
  }
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Moving within the same column
      const column = columns[source.droppableId];
      const items = Array.from(column.items);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items
        }
      });
    } else {
      // Moving between columns
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    }
  };

  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-semibold mb-4 text-gray-700">
                {column.title} ({column.items.length})
              </h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[200px]"
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <JobCard
                            ref={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                            {...item}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard; 