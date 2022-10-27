import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import qs from "query-string";

export default function BoxMv() {
  const loc = useLocation().search;
  // console.log(loc);

  const mvcd = qs.parse(loc);
  // console.log(mvcd);

  // state변수
  const [mv, setMv] = useState();
  const [mvInfo, setMvInfo] = useState();
  //함수
  const getMovie = async (mvcd) => {
    let url =
      "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?";
    url = url + "key=f5eef3421c602c6cb7ea224104795888";
    url = url + "&movieCd=" + mvcd;

    const resp = await fetch(url);
    const data = await resp.json();
  };
  //useEffect
  useEffect(() => {
    getMovie(mvcd);
  }, []);

  return (
    <>
      <h1>영화정보</h1>
    </>
  );
}
