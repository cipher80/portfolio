import { useEffect, useState } from 'react';

export default function useProfile(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let alive = true;
    fetch('/api/profile')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => { if (alive) { setData(d?.data ?? null); setLoading(false); } })
      .catch(e => { if (alive) { setError(e); setLoading(false); } });

    return ()=>{ alive = false; };
  },[]);

  return { data, loading, error };
}
