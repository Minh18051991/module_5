import React from 'react';

class CRUDApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentItem: {
                id: '',
                name: ''
            }
        };
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState(prevState => ({
            currentItem: {...prevState.currentItem, [name]: value}
        }));
    }
    addItem = (e) => {
        e.preventDefault();
        const {items, currentItem} = this.state;
        const newItem = {...currentItem, id: Date.now()};
        this.setState({
            items: [...items, newItem],
            currentItem: {id: '', name: ''}
        });
    }
    deleteItem = (id) => {
        this.setState(prevState => ({
            items: prevState.items.filter(item => item.id !== id)
        }));
    }
    updateItem = (id, updatedItem) => {
        this.setState(prevState => ({
            items: prevState.items.map(item => item.id === id ? updatedItem : item)
        }));
        this.setState({currentItem: {id: '', name: ''}});
    }

    render() {
        const {items, currentItem} = this.state;
        return (
            <div className="container">
                <h1>CRUD App</h1>
                <form onSubmit={this.addItem}>
                    <input type="text" name="name" placeholder="Enter item name" value={currentItem.name}
                           onChange={this.handleInputChange}/>
                    <button type="submit">Add Item</button>
                </form>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name}
                            <button onClick={() => this.updateItem(item.id, {
                                ...item,
                                name: prompt('Update item name')
                            })}>Update
                            </button>
                            <button onClick={() => this.deleteItem(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default CRUDApp;