import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: '',
      contactData: [
        {
          name: 'Abet',
          phone: '010-0000-0001',
        },
        {
          name: 'Betty',
          phone: '010-0000-0002',
        },
        {
          name: 'Charlie',
          phone: '010-0000-0003',
        },
        {
          name: 'David',
          phone: '010-0000-0004',
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key,
    });
    console.log(key, 'is selected');
  }

  handleCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData, {
        $push: [contact],
      }),
    });
  }

  handleRemove() {
    if (this.state.selectedKey < 0) {
      return;
    }
    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]],
      }),
      selectedKey: -1,
    });
  }

  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: { $set: name },
          phone: { $set: phone },
        },
      }),
    });
  }

  render() {
    const mapToComponents = (data) => {
      data.sort();
      data = data.filter((contact) => {
        return contact.name.toLowerCase().includes(this.state.keyword);
      });
      return data.map((contact, i) => {
        return (
          <ContactInfo
            contact={contact}
            key={i}
            // 컴포넌트에 이벤트가 아닌 props로 전달됨
            onClick={() => {
              this.handleClick(i);
            }}
          />
        );
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          type="text"
          placeholder="search"
          value={this.state.keyword}
          onChange={this.handleChange}
        ></input>
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey !== -1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        ></ContactDetails>
        <ContactCreate onCreate={this.handleCreate}></ContactCreate>
      </div>
    );
  }
}
