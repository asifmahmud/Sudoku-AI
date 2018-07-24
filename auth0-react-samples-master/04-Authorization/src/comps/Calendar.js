import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Dnd extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {

      events: 
      	[
		  {
		    id: 0,
		    title: 'Board meeting',
		    start: new Date(2018, 0, 29, 9, 0, 0),
		    end: new Date(2018, 0, 29, 13, 0, 0),
		    resourceId: 1,
		  },
		  {
		    id: 1,
		    title: 'MS training',
		    start: new Date(2018, 0, 29, 14, 0, 0),
		    end: new Date(2018, 0, 29, 16, 30, 0),
		    resourceId: 2,
		  },
		  {
		    id: 2,
		    title: 'Team lead meeting',
		    start: new Date(2018, 0, 8, 8, 30, 0),
		    end: new Date(2018, 0, 29, 12, 30, 0),
		    resourceId: 3,
		  },
		  {
		    title: 'Birthday Party',
		    start: new Date(2018, 0, 30, 7, 0, 0),
		    end: new Date(2018, 0, 30, 10, 30, 0),
		    resourceId: 4,
		  },
		]
    };
    this.minTime = new Date();
    this.minTime.setHours(8,0,0);
    this.maxTime = new Date();
    this.maxTime.setHours(20,30,0);
    this.moveEvent = this.moveEvent.bind(this)
  }
  
  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({ events: nextEvents });

    // alert(`${event.title} was dropped onto ${event.start}`);
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent => { return existingEvent.id == event.id ? { ...existingEvent, start, end } : existingEvent });

    this.setState({ events: nextEvents });

    // alert(`${event.title} was resized to ${start}-${end}`);
  }

  render() {
    let events, minTime, maxTime;
    if (this.props.events != undefined){
      events = this.props.events;
    }
    else {
      events = this.state.events;
    }
    
    if (this.props.minTime != undefined){
      minTime = this.props.minTime;
    }
    else {
      minTime = this.minTime;
    }

    if (this.props.maxTime != undefined){
      maxTime = this.props.maxTime;
    }
    else {
      maxTime = this.maxTime;
    }
  
    return (
      <DragAndDropCalendar
        selectable
        events={events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        defaultView="week"
        toolbar={false}
        min={minTime}
        max={maxTime}
        defaultDate={this.props.tripStart} />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)