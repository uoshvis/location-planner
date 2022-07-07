const now = new Date()

const events = [
    

  {
    id: 1,
    location: 'loc1',
    title: 'Today_loc1',
    start: new Date(new Date().setHours(new Date().getHours() + 24)),
    end: new Date(new Date().setHours(new Date().getHours() + 27)),
  },
  
  {
    id: 2,
    location: 'loc1',
    title: 'Point in Time Event loc1',
    start: now,
    end: new Date(now.getTime() + 20*60000)

  },

  {
    id: 3,
    title: 'Today_loc2',
    location: 'loc2',
    start: new Date(new Date().setHours(new Date().getHours() - 40)),
    end: new Date(new Date().setHours(new Date().getHours() - 38)),
  },

  {
    id: 4,
    location: 'loc2',
    title: 'Point in Time Event loc2',
    start: now,
    end: new Date(now.getTime() + 45*60000),
  },
    
]


module.exports = events