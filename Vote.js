const processVotes = (function processVotes() {
  
  const voteStore = {};
  let instance;
  
  function init() {
    const candidates = {
      goa: 0,
      delhi: 0,
      mumbai: 0,
      banglore: 0,
      colombo: 0,
      berlin: 0,
      moscow: 0,
      budapest: 0
    };
    
    function vote(time, city) {
      if(!candidates[city]) {
        candidates[city] = 1;
      } else {
        candidates[city] += 1;
      }
      voteStore[time] = city;
    }
  
    function getCitiesWithinTimeRange(start, end) {
      const votersList = [];
      const topCities = {};
    
      Object.keys(voteStore).forEach((value, key) => {
        if(parseInt(value) <= end && parseInt(value) >= start) {
          votersList.push(voteStore[value]);
        }
      });
    
      votersList.forEach( (city) => {
        if(!topCities[city]) {
          topCities[city] = 1;
        } else {
          topCities[city] += 1;
        }
      });
    
      return topCities;
    }
    
    return {
      vote,
      getCandidates: candidates,
      getVoteStore: voteStore,
      getCitiesWithinTimeRange: getCitiesWithinTimeRange
    }
  }
  
  return {
    getInstance: function () {
      if(!instance) {
        instance = init();
      }
      return instance;
    }
  }
  
})();

module.exports = Object.freeze(processVotes);
