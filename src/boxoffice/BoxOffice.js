import BoxMv from "./BoxMv";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
function Boxoffice() {
  /// 1.날짜에 알맞는 json 데이터 호출 (default : 어제날짜) ///////////////////////////////////////////////
  // then..catch 구문
  const getBoxoffice = async (d) => {
    let url =
      "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?";
    url = url + "key=f5eef3421c602c6cb7ea224104795888";
    url = url + "&targetDt=" + d;
    // 비동기 통신
    try {
      const resp = await fetch(url);
      const data = await resp.json();

      console.log(data.boxOfficeResult.dailyBoxOfficeList);
      let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;

      setOfficeList(
        dailyBoxOfficeList.map((item) => (
          <li key={item.movieCd}>
            <Link to={"/mv?mvcd" + item.movieCd}>
              {item.rank}
              {item.movieNm}
              {item.rankInten > 0 ? "🔼" : item.rankInten < 0 ? "🔽" : ""}
              {Math.abs(Number(item.rankInten))}
            </Link>
          </li>
        ))
      );
    } catch (err) {
      console.log(err);
    }
  }; // Boxoffice()

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 2. State 변수 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [viewDay, setViewDay] = useState(); //setViewDay + 콜백을 통해 viewDay 바꿀 수 있음.
  const [viewD, setViewD] = useState();
  const [officeList, setOfficeList] = useState([]);

  useEffect(() => {
    viewDay &&
      setViewD(
        viewDay.substring(0, 4) +
          "." +
          viewDay.substring(4, 6) +
          "." +
          viewDay.substring(6, 8)
      );
  }, [viewDay]);

  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let d = yesterday.toISOString().substring(0, 10).replaceAll("-", ""); //0~9Rkwl
    console.log(d);
    setViewDay(d); //useState랑 물려있음.
    getBoxoffice(d); // boxoffice Open API 호출.
  }, []);

  // 3. ref 변수 ////////////////////////////////////////////////////////////////////////////////////////////////
  const refDateIn = useRef();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 이벤트 함수 ////////////////////////////////////////////////////////////////////////////////////////////
  const handleChange = (e) => {
    e.preventDefault();
    setViewDay(refDateIn.current.value.replaceAll("-", ""));
    getBoxoffice(viewDay);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <h1>박스오피스 ({viewD}일자)</h1>
      <form>
        {/* 날짜 데이터 입력 input */}
        <input
          type="date"
          name="dateIn"
          ref={refDateIn}
          onChange={handleChange}
        />
      </form>
      {officeList}
    </>
  );
}

export default Boxoffice;

// const getBoxoffice = () => {
//   let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
//   url = url + 'key=f5eef3421c602c6cb7ea224104795888';
//   url = url + '&targetDt=' + '20120101';
//   // 비동기 통신
//   fetch(url)
//     .then((res)=>res.json())
//     .then((data)=>console.log(data))
//     .catch((err)=>{console.log(err)})
// } // Boxoffice()
