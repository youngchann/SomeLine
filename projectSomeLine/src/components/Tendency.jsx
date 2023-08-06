import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'SPORT';

const DraggableSport = ({ sport, index }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { sport, index },
  });

  return (
    <div ref={ref} className='tendency_in_contents'>
      {sport}
    </div>
  );
};

const DroppableBox = ({ sports, setSports, otherSports, setOtherSports, className }) => {
  const [, ref] = useDrop({
    accept: ItemType,
    drop: (item) => {
      setOtherSports(otherSports.filter((_, idx) => idx !== item.index));
      setSports([...sports, item.sport]);
    },
  });

  return (
    <div ref={ref} className={className}>
      {sports.map((sport, index) => (
        <DraggableSport key={index} sport={sport} index={index} />
      ))}
    </div>
  );
};

const Tendency = () => {
  const [allSports, setAllSports] = useState(['축구', '농구', '야구', '테니스', '배드민턴']);
  const [mySports, setMySports] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='tendency_bg'>
        <div className="login_bgm_b">
            <video className="login_bgm" autoPlay muted loop>
            <source src='videos/mainmain10.mp4' type='video/mp4' />
            </video>
        </div>

        <div className='tendency_box'>
          <DroppableBox
            sports={mySports}
            setSports={setMySports}
            otherSports={allSports}
            setOtherSports={setAllSports}
            className='tendency_my_list'
          />
          <DroppableBox
            sports={allSports}
            setSports={setAllSports}
            otherSports={mySports}
            setOtherSports={setMySports}
            className='tendency_list'
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Tendency;

