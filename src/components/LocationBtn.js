function LocationBtn ({location, handleLocationChange}) {
  
    const btnClassNames = {
      normal: 'btn btn_location_normal',
      active: 'btn btn_location_normal btn_location_active'
    }
  
    const btnData = [
      {
        value: 'all',
        text: 'All locations',
      },
      {
        value: 'loc1',
        text: 'Location 1',
      },
      {
        value: 'loc2',
        text: 'Location 2',
      }
    ]
  
    const btnItems = btnData.map(({value, text}) =>
      <button
        className={location === value ? btnClassNames.active : btnClassNames.normal }
        key={value}
        value={value}
        onClick={(e) => handleLocationChange(e)}>
        {text}
      </button>
  );
   
    return (
     <div>
  
      {btnItems}
  
     </div>
   )
  }

  export default LocationBtn