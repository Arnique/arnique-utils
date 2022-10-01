function msToDuration(ms) {
  if (isNaN(ms)) return '';

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  if (ms < msPerMinute) {
    const dur = Math.round(ms/1000);
    return `${dur} second${dur > 1 ? 's' : ''}`; 
  }

  else if (ms < msPerHour) {
    const dur = Math.round(ms/msPerMinute);
    return `${dur} minute${dur > 1 ? 's' : ''}`;   
  }

  else if (ms < msPerDay ) {
    const dur = Math.round(ms/msPerHour); 
    return `${dur} hour${dur > 1 ? 's' : ''}`;   
  }

  else if (ms < msPerMonth) {
    const dur = Math.round(ms/msPerDay); 
    return `approximately ${dur} day${dur > 1 ? 's' : ''}`;   
  }

  else if (ms < msPerYear) { 
    const dur = Math.round(ms/msPerMonth); 
    return `approximately ${dur} month${dur > 1 ? 's' : ''}`;   
  }

  else {  
    const dur = Math.round(ms/msPerYear); 
    return `approximately ${dur} year${dur > 1 ? 's' : ''}`;  
  }
}

function timeStamp(text = '') {
  const d = new Date();
  let ds = d.toISOString();
  ds = ds.replace('T', ':');
  const p = ds.replace('Z', '').split(':');

  return {
    ms: d.getTime(),
    timeString: `${p[1]}:${p[2]}:${p[3]} ${text}`
  }
}

module.exports = {
  msToDuration,
  timeStamp
}
