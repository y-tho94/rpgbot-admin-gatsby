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
    const retval = Object.values(dataItem[0]);

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
    let titleString = 'Modify';
    if (qsID == 0) {
      titleString = 'Create New';
    }

    const monst = this.state.monsterData;
    const types = this.state.monsterTypes;

    return (
      <>
        <h1>Monster Lab - {titleString} </h1>
        <div id="root" style={{ justifyContent: 'center' }}>
          <header>

          </header>
          <main>
            <div style={
              {
                border: '1px solid white',
                width: '50%',
                margin: 'auto',
                padding: '2rem',
                textAlign: 'left'
              }}
            >
              <Form
                name="frmMonster"
                onFinish={this.frmSubmit}
                onFinishFailed={this.frmFail}
                layout='vertical'
              >
                <table style={{ width: '50%', margin: 'auto' }}>
                  <tr>
                    <td colSpan={2}>
                      <Form.Item
                        label="Name"
                        name="name"
                        initialValue={monst.name ?? ''}
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
                        initialValue={monst.type}
                        rules={
                          [
                            {
                              required: true,
                              message: '*Type required'
                            }
                          ]}
                      >
                        <Select>
                          {types.map(t => {
                            return (
                              <Select.Option
                                key={t.id}
                                value={t.id}
                              >
                                {t.Type_Desc}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Item
                        label="Base HP"
                        name="baseHP"
                        initialValue={monst.HP ?? 1}
                      >
                        <InputNumber step={1} />
                      </Form.Item>
                      <Form.Item
                        label="Base ATK"
                        name="baseATK"
                        initialValue={monst.ATK ?? 1}
                      >
                        <InputNumber step={1} />
                      </Form.Item>
                      <Form.Item
                        label="Base DEF"
                        name="baseDEF"
                        initialValue={monst.DEF ?? 1}
                      >
                        <InputNumber step={1} />
                      </Form.Item>
                      <Form.Item
                        label="Base SPD"
                        name="baseSPD"
                        initialValue={monst.SPD ?? 1}
                      >
                        <InputNumber step={1} />
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        label="Base SPEC"
                        name="baseSPEC"
                        initialValue={monst.Spec ?? 1}
                      >
                        <InputNumber step={1} />
                      </Form.Item>
                      <Form.Item
                        label="Base Wealth"
                        name="baseWealth"
                        initialValue={monst.Money ?? 1}
                      >
                        <InputNumber step={10} />
                      </Form.Item>
                      <Form.Item
                        label="Base XP"
                        name="baseXP"
                        initialValue={monst.XP ?? 1}
                      >
                        <InputNumber step={10} />
                      </Form.Item>
                      <Form.Item
                        label="Level Multiplier"
                        name="lvlMult"
                        initialValue={monst.LVL_Multiplier ?? 1}
                      >
                        <InputNumber step={.05} precision={2} />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Button type='primary' htmlType="submit">Submit</Button>
                    </td>
                  </tr>
                </table>
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
