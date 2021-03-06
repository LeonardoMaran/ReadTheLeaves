import React from 'react';
import { Link } from 'react-router-dom';
import EventIndex from '../events/event_index';
import isEmpty from 'lodash/isEmpty';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser, leaveEvent, removeEvent, updateEvent } = this.props;
    const { attending_events, hosted_events } = currentUser;
    let cityLink;
    let hostLink;
    let hostedEvents = (<h3 className="user-info">You're currently not hosting any events...</h3>);
    let attendingEvents = (<h3 className="user-info">You're currently not attending any events...</h3>);
    if (currentUser.city_id) {
        cityLink = (<Link className="dashboard-element link" to={`/cities/${currentUser.city_id}`}>
                    <h3>Your City</h3>
                  </Link>);
        hostLink = (<Link className="update-button" to="/new_event">
                      CLICK HERE TO HOST AN EVENT IN {currentUser.city_name.toUpperCase()}
                   </Link>);
    }

    if (!_.isEmpty(hosted_events)) {
      hostedEvents = (
        <div className="profile-events-container">
          <h3 className="user-info">These are the events you're hosting...</h3>
          <EventIndex
            events={hosted_events}
            user={currentUser}
            attendEvent={null}
            leaveEvent={leaveEvent}
            removeEvent={removeEvent}
            />
        </div>
      )
    }

    if (!_.isEmpty(attending_events)) {
      attendingEvents = (
        <div className="profile-events-container">
          <h3 className="user-info">These are the events you're attending...</h3>
          <EventIndex
            events={attending_events}
            user={currentUser}
            attendEvent={null}
            leaveEvent={leaveEvent}
            removeEvent={removeEvent}
            />
        </div>
      )
    }

    return (
      <div className="dashboard-body-container">
        <div className="dashboard-header">
          <h1 className="dashboard-element">Your Dashboard: Hello, {currentUser.first_name}</h1>
          {cityLink}
          <Link className="dashboard-element link" to='/update_profile'>
            <h3>Update Your Profile</h3>
          </Link>
        </div>
        <div className="dashboard-container">
          {hostLink}
        <div className="dashboard-events-container">
          {hostedEvents}
          {attendingEvents}
        </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
