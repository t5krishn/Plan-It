import React, { useReducer, useEffect } from "react";

export default function useTripData() {
    const SET_TRIP = "SET_TRIP";

    function reducer(state, action) {
        switch (action.type) {
            case SET_TRIP:
                return { 
                    ...state,
                    trip_id: action.tripId,
                    to_dos : action.toDos,
                    events : action.events,
                    expenses : action.expenses
                };
        
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        tripId: 0,
        toDos: {},
        events: {},
        expenses: {}
    });

    function fetchTripData(tripId) {
        return (
            fetch(`http://localhost:5422/user/${tripId}`)
            .then( data => {
                console.log(data);
            })
        );
    }

    return { state, fetchTripData };
    
};
