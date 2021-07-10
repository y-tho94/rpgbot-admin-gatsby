import React from 'react';
import './data-grid.styles.css';

const DatagridTitleBar = (props) => {

  if (!props.addTitleBar) {
    return <></>;
  }

  return (
    <>
      <thead>
        <tr>
          {props.titleColumns.map(col => {
            const curIndex = props.titleColumns.indexOf(col);
            const sortCols = props.sortCols;
            const isSort = sortCols.includes(props.titleColumns[curIndex]);
            let thisClassName = `title_${curIndex}`;

            if (isSort) {
              thisClassName += ' ASC';
            }
            return (
              <td
                key={`title_${curIndex}`}
                className={thisClassName}
                onClick={() => {
                  if (sortCols.includes(props.titleColumns[curIndex])) {
                    const thisTR = Array.from(document.getElementsByClassName(`title_${curIndex}`))[0];
                    props.handleSort(thisTR, curIndex);
                  }
                }}
              >
                {col}
              </td>
            )
          })}
        </tr>
      </thead>
    </>
  )
}

export default DatagridTitleBar;