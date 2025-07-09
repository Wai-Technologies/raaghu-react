# Migration Guide: react-beautiful-dnd to @dnd-kit

This guide helps you migrate from the deprecated `react-beautiful-dnd` to the modern `@dnd-kit` library.

## Package Changes

**Old:**
```json
"react-beautiful-dnd": "^13.1.1",
"@types/react-beautiful-dnd": "^13.1.8"
```

**New:**
```json
"@dnd-kit/core": "^6.1.0",
"@dnd-kit/sortable": "^8.0.0",
"@dnd-kit/utilities": "^3.2.2"
```

## Code Migration Examples

### Basic Sortable List

**Old (react-beautiful-dnd):**
```tsx
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function SortableList({ items, onReorder }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
```

**New (@dnd-kit):**
```tsx
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function SortableList({ items, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            {item.content}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
```

## Key Differences

1. **Context**: `DragDropContext` → `DndContext`
2. **Sensors**: @dnd-kit requires explicit sensor configuration
3. **Item wrapping**: Individual items use `useSortable` hook instead of `Draggable` component
4. **Event handling**: Different event structure and reordering logic
5. **Styling**: Uses `CSS.Transform.toString()` for transforms

## Benefits of @dnd-kit

- Better TypeScript support
- More performant
- Better accessibility
- Active maintenance
- More flexible API
- Smaller bundle size
