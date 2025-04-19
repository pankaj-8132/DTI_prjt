// StyleCalendar.jsx
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

const initialItems = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const outfitOptions = [
  { id: 'outfit-1', name: 'Casual Jeans & Tee', type: 'Casual' },
  { id: 'outfit-2', name: 'Formal Suit', type: 'Formal' },
  { id: 'outfit-3', name: 'Sporty Tracksuit', type: 'Sporty' },
  { id: 'outfit-4', name: 'Summer Dress', type: 'Summer' },
  { id: 'outfit-5', name: 'Hoodie & Joggers', type: 'Comfort' },
  { id: 'outfit-6', name: 'Business Casual', type: 'Formal' },
  { id: 'outfit-7', name: 'Evening Gown', type: 'Party' },
  { id: 'outfit-8', name: 'Winter Coat & Boots', type: 'Winter' },
];

const outfitTypes = ['All', ...new Set(outfitOptions.map(opt => opt.type))];

const StyleCalendar = () => {
  const [calendar, setCalendar] = useState(() => {
    const saved = localStorage.getItem('style-calendar');
    return saved ? JSON.parse(saved) : initialItems;
  });

  const [selectedDate, setSelectedDate] = useState({});
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    localStorage.setItem('style-calendar', JSON.stringify(calendar));
  }, [calendar]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceDroppable = source.droppableId;
    const destDroppable = destination.droppableId;

    if (sourceDroppable === 'outfits') {
      const draggedItem = outfitOptions.find(item => item.id === draggableId);
      const newItem = { ...draggedItem, id: uuidv4() };

      const destItems = Array.from(calendar[destDroppable]);
      destItems.splice(destination.index, 0, newItem);

      setCalendar({ ...calendar, [destDroppable]: destItems });
      return;
    }

    if (sourceDroppable === destDroppable) {
      const reordered = Array.from(calendar[sourceDroppable]);
      const [movedItem] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, movedItem);
      setCalendar({ ...calendar, [sourceDroppable]: reordered });
    } else {
      const sourceItems = Array.from(calendar[sourceDroppable]);
      const destItems = Array.from(calendar[destDroppable]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setCalendar({
        ...calendar,
        [sourceDroppable]: sourceItems,
        [destDroppable]: destItems,
      });
    }
  };

  const handleDateChange = (day, index, date) => {
    setSelectedDate(prev => ({ ...prev, [`${day}-${index}`]: date }));
  };

  const deleteItem = (day, index) => {
    const updatedDay = [...calendar[day]];
    updatedDay.splice(index, 1);
    setCalendar({ ...calendar, [day]: updatedDay });
  };

  const clearCalendar = () => {
    setCalendar(initialItems);
    setSelectedDate({});
    localStorage.removeItem('style-calendar');
  };

  const filteredOptions =
    filterType === 'All'
      ? outfitOptions
      : outfitOptions.filter((item) => item.type === filterType);

  return (
    <div className="p-6 bg-gradient-to-br from-purple-600 to-indigo-800 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-white drop-shadow-lg">
        🗓️ Personal Style Calendar
      </h1>
      <p className="text-center text-white mb-6">
        Drag and drop outfits onto your weekly planner!
      </p>

      <div className="flex justify-center mb-6 gap-4 flex-wrap">
        <select
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg px-4 py-2 text-black"
          aria-label="Filter outfits by type"
        >
          {outfitTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button
          onClick={clearCalendar}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          title="Clear all outfits from calendar"
        >
          🧹 Clear All
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(calendar).map((day) => (
            <div
              key={day}
              className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-purple-400"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-700">{day}</h2>
              <Droppable droppableId={day}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[120px] bg-gray-100 p-3 rounded-md"
                  >
                    {calendar[day].map((item, index) => (
                      <Draggable draggableId={item.id} index={index} key={item.id}>
                        {(provided) => (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white px-4 py-2 rounded-lg mb-3 shadow-md"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                              <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-xs">{item.type}</p>
                                <input
                                  type="date"
                                  className="bg-white text-black text-sm rounded px-2 mt-1"
                                  value={selectedDate[`${day}-${index}`] || ''}
                                  onChange={(e) =>
                                    handleDateChange(day, index, e.target.value)
                                  }
                                  title="Select date"
                                />
                              </div>
                              <button
                                onClick={() => deleteItem(day, index)}
                                className="text-sm bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white"
                                title="Delete outfit"
                              >
                                ❌
                              </button>
                            </div>
                          </motion.div>
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

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">🧥 Outfit Options</h2>
          <Droppable droppableId="outfits" isDropDisabled={true} direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-4 flex-wrap justify-center"
              >
                {filteredOptions.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-pink-500 hover:bg-pink-600 transition text-white font-semibold px-5 py-2 rounded-xl shadow cursor-grab"
                        title={item.type}
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default StyleCalendar;
