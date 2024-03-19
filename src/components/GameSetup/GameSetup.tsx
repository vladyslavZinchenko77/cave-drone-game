import { FC } from 'react';
import { Form, Button, Input, Select } from 'antd';

const { Option } = Select;

import './GameSetup.scss';

const GameSetup: FC = () => {
  const onFinish = (values: { name: string; complexity: number }) => {
    console.log(values);
  };

  const [form] = Form.useForm();

  return (
    <div className="game-setup">
      <div className="game-setup__wrap">
        <h2 className="game-setup__title">Hi👋! Welcome to Cave Drone Game!</h2>
        <Form
          layout="vertical"
          className="game-setup__form"
          form={form}
          name="gameSetup"
          onFinish={onFinish}
          initialValues={{ complexity: 0 }}
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            name={'name'}
            className="game-setup__form-item"
            label="Player name:"
            rules={[{ required: true, message: 'Enter your name' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Complexity level:"
            className="game-setup__form-item"
            name="complexity"
            rules={[
              { required: true, message: 'Choose the level of complexity' },
              { type: 'number', min: 0, max: 10 },
            ]}
          >
            <Select placeholder="Choose the level of complexity">
              {[...Array(11).keys()].map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item className="game-setup__form-item">
            <Button>Start the game</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default GameSetup;
