import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const Covid = () => {
  // const [count, setCount] = useState(0);
  // const [odd, setOdd] = useState(false);
  // useEffect(() => {
  //   console.log("so le");
  // }, [()=> odd===true]);
  // return (
  //   <div>
  //     <p>{count}</p>
  //     <button
  //       onClick={() => {
  //         setCount(count + 1);
  //         if (count % 2 === 1) {
  //           setOdd(true);
  //         }
  //       }}
  //     >
  //       +
  //     </button>
  //   </div>
  // );
  const [data, setData] = useState([]);
  const getData = useCallback(() => {
    return axios.get(
      "https://api.covid19api.com/country/vietnam?from=2021-10-01T00%3A00%3A00Z&to=2021-10-20T00%3A00%3A00Z"
    );
  }, []);
  useEffect(() => {
    let x = getData().then((x) => console.log(x));
    console.log(x);
    getData()
      .then((res) => {
        if (res && res.data.length > 0) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log("loi roi", err);
      });
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>Comfirm</th>
          <th>Active</th>
          <th>Deaths</th>
          <th>Recovered</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((item) => {
            return (
              <tr key={item.ID}>
                <td>{item.Comfirm}</td>
                <td>{item.Active}</td>
                <td>{item.Deaths}</td>
                <td>{item.Recovered}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Covid;
