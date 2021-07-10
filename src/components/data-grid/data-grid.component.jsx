import React from "react";
import './data-grid.styles.css';
import DatagridTitleBar from './data-grid-title.component';

class Datagrid extends React.Component {
  //renders table rows
  /**
   * Props----
   * dataItem: Enumerable list of data to be repeated over
   * cols: Enumerable of which fields from dataItem to display
   * addTitleBar: Bool - show cols object as first row
   * sortCols: Enumerable of columns to have a toggleable sort onClick
   * editForm: string - link to edit form
   * editMode: String - "modal" : on-screen popup, "page" : seperate html page
   * addSelect: Bool - create a checkbox
   */

  constructor(props) {
    super(props);

    this.state = {
      sortedDataItem: this.props.dataItem,
      titleColumns: this.props.cols
    }
  }

  handleSort = (column, index) => {
    if (column.classList.contains('ASC')) {
      this.setState((prevState, prevProps) => {
        return {
          sortedDataItem: prevState.sortedDataItem.sort((a, b) => {
            const cols = prevProps.cols;
            return b[cols[index]] > a[cols[index]];
          })
        }
      })

      column.classList.remove('ASC');
      column.classList.add('DESC');
    } else {
      this.setState((prevState, prevProps) => {
        return {
          sortedDataItem: prevState.sortedDataItem.sort((a, b) => {
            const cols = prevProps.cols;
            return a[cols[index]] > b[cols[index]]
          })
        }
      })

      column.classList.remove('DESC');
      column.classList.add('ASC');
    }
  }

  renderEdit = (id) => {
    switch (this.props.editMode) {
      case "modal":
        break;
      case "page":
        return (
          <td key={"edit_" + id}><a className="edit-button" href={this.props.editForm + '?id=' + id}>Edit</a></td>
        )
      default:
        return false;
    }
  }

  componentDidMount() {
    if (this.props.addSelect) {
      this.setState((prevState, prevProps) => {
        return { titleColumns: ['', ...prevState.titleColumns] }
      });
    }

    if (typeof (this.props.editForm) != 'undefined') {
      this.setState((prevState, prevProps) => {
        return { titleColumns: ['', ...prevState.titleColumns] }
      });
    }
  }

  render() {

    return (
      <table className="data-grid" cellSpacing="0">
        <DatagridTitleBar
          addTitleBar={this.props.addTitleBar}
          titleColumns={this.state.titleColumns}
          sortCols={this.props.sortCols}
          handleSort={this.handleSort}
        />
        <tbody>
          {this.props.dataItem.map(data => {
            return (
              <tr key={`${this.props.id}_${data.id}`}>
                {(() => {
                  if (this.props.addSelect) {
                    return (
                      <td key={Math.random() % 11}>
                        <input type="checkbox" id={"cb" + data.id} key={"cb" + data.id} />
                      </td>
                    )
                  }
                })()}
                {(() => {
                  if (typeof (this.props.editForm) != 'undefined') {
                    return (
                      this.renderEdit(data.id)
                    )
                  }
                })()}
                {
                  Object.entries(data).map(col => {
                    if (this.state.titleColumns.includes(col[0])) {
                      return (
                        <td key={`${this.props.id}_${data.id}_col${this.state.titleColumns.indexOf(col[0])}`}>
                          {col[1]}
                        </td>
                      )
                    } else {
                      return (<></>);
                    }
                  })
                }
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Datagrid;