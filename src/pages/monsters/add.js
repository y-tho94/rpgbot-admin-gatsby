import React from 'react';
import '../../styles.css';
import { Link } from 'gatsby';

import { Form, Input, InputNumber, Select, Button } from 'antd';

class MonsterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monsterData: [],
      monsterTypes: []
    }
  }

  getMonsterByID = async (id) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Referrer-Policy': 'same-origin',
      }
    }
    const response = await fetch('https://dev.freydo-apis.tech/rpgbot/monster/get-edit/index.php?id=' + id, options);
    const dataItem = await response.json();
    const retval = dataItem;

    return retval;
  }

  getMonsterTypes = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Referrer-Policy': 'same-origin',
      }
    }

    const response = await fetch('https://dev.freydo-apis.tech/rpgbot/monster/get-types-lk/index.php', options);
    const dataItem = await response.json();
    const retval = dataItem[0];

    return retval;
  }

  componentDidMount() {
    const paramsList = new URLSearchParams(window.location.search);
    const MonsterID = paramsList.get('id');

    this.getMonsterByID(MonsterID)
      .then(monster => {
        this.setState({
          monsterData: monster
        });
      });

    this.getMonsterTypes()
      .then(types => {
        this.setState({
          monsterTypes: types
        });
      });
  }


  frmSubmit = (items) => {
    console.log(items);
  }

  frmFail = (items) => {
    console.log(items);
  }

  render() {
    if ((!this.state.monsterData || this.state.monsterData.length === 0) || (!this.state.monsterTypes || this.state.monsterTypes.length === 0)) {
      return (<div><footer>
        <Link className="grid-button" to='/'>
          Return to home
        </Link>
      </footer></div>)
    }

    const qs = new URLSearchParams(window.location.search);
    const qsID = qs.get('id');
    console.log(qsID);
    let titleString = 'Modify';
    if (qsID == 0) {
      titleString = 'Create New';
    }

    return (
      <>
        <h1>Monster Lab - {titleString} </h1>
        <div id="root" style={{ justifyContent: 'center' }}>
          <header>

          </header>
          <main>
            <div style={{ border: '1px solid white', width: '50%', margin: 'auto', padding: '2rem' }}>
              <Form
                name="frmMonster"
                onFinish={this.frmSubmit}
                onFinishFailed={this.frmFail}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={
                    [
                      {
                        required: true,
                        message: '*Name required'
                      }
                    ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name="type_ID"
                  rules={
                    [
                      {
                        required: true,
                        message: '*Type required'
                      }
                    ]}
                >
                  <Select>
                    {this.state.monsterTypes.map(t => {
                      return (
                        <Select.Option
                          key={t.id}
                        >
                          {t.Type_Desc}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
                <Button type='primary' htmlType="submit">Submit</Button>
              </Form>
            </div>
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

export default MonsterForm;
