import { useState, useEffect } from 'react';
import CalendarComponent from '../components/CalendarComponent';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';

function Add() {
  const [loading, setLoading] = useState(false);
  // const [calendar, setCalendar] = useState();
  const [food, setFood] = useState();
  const [trash, setTrash] = useState();
  // const getCalendar = async () => {
  //   const response = await fetch();
  //   const json = await response.json();
  //   setCalendar();
  //   setLoading(false);
  // };
  //useEffect(() => getCalendar(), []);
  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <h1>기록 추가하기</h1>
          <form>
            <CalendarComponent />
            <Input name="cost" />
            <Dropdown />
            <Input name="content" />

            <input type="checkbox" id="food" name="extra" value="food" />
            <label for="food">음식</label>
            <input type="checkbox" id="trash" name="extra" value="trash" />
            <label for="trash">쓰레기</label>
          </form>
        </div>
      )}
    </div>
  );
}

export default Add;
