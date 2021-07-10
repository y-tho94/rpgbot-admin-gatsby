import React from 'react';
import '../../styles.css';

import { Table } from 'antd';

import { Link } from 'gatsby';

class MonstersPage extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCols: [],
      dataItem: [],
      filterStr: '',
      selectedRowKey: null
    }
  }

  componentDidMount() {
    this.getData()
      .then(monsters => {
        this.setState({
          selectedCols: Object.keys(monsters[0]).slice(1),
          dataItem: monsters
        });
      });
  }

  getData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Referrer-Policy': 'same-origin',
      }
    }
    const response = await fetch('https://dev.freydo-apis.tech/rpgbot/monster/get-all/index.php', options);
    const dataItem = await response.json();
    const retval = dataItem[0];
    return retval;
  }

  onRowSelectChange = selectedRows => {
    this.setState({
      selectedRowKey: selectedRows
    })
    console.log(this.state.selectedRowKey)
  }

  render() {
    if (this.state.selectedCols.length <= 0 || this.state.dataItem.length <= 0) {
      return <div />
    }

    const dataCols = this.state.selectedCols.map((col) => {
      const returnCols = {
        title: col,
        dataIndex: col,
        render: this.state.selectedCols[col],
        sorter: {
          compare: (a, b) => a[col].localeCompare(b[col])
        }
      }
      return returnCols
    });

    const dataRows = this.state.dataItem.map(row => {
      return { key: row.id, ...row }
    });

    return (
      <>
        <h1>Monster Lab</h1>
        <div id="root" style={{ justifyContent: 'center' }}>
          <header>

          </header>
          <main>
            <Table
              columns={dataCols}
              dataSource={dataRows}
              pagination={{ defaultPageSize: 25 }}
              rowSelection={{
                type: 'radio',
                onChange: selectedRowKey => {
                  window.location.assign(`add?id=${selectedRowKey}`);
                }
              }}
            />
          </main>
          <footer>
            <Link className="grid-button" to='/'>
              Return to home
            </Link>
          </footer>
        </div>
      </>
    )
  }
}

export default MonstersPage;
