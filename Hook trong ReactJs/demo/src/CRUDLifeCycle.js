import React from 'react';

class CRUDLifecycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentItem: { id: '', name: '' },
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        console.log('Component did mount');
        localStorage.removeItem('items'); // Xóa dữ liệu cũ để test

        setTimeout(() => {
            console.log('Timeout executed');
            try {
                let savedItems = localStorage.getItem('items');
                console.log('Saved items:', savedItems);
                
                if (savedItems) {
                    this.setState({ items: JSON.parse(savedItems), isLoading: false });
                } else {
                    const sampleData = [
                        { id: '1', name: 'Học React' },
                        { id: '2', name: 'Làm project demo' },
                        { id: '3', name: 'Viết blog về React' },
                        { id: '4', name: 'Tìm hiểu về Redux' },
                        { id: '5', name: 'Thực hành CRUD' }
                    ];
                    localStorage.setItem('items', JSON.stringify(sampleData));
                    this.setState({ items: sampleData, isLoading: false });
                }
                console.log('State after update:', this.state);
            } catch (error) {
                console.error('Error in componentDidMount:', error);
                this.setState({ error, isLoading: false });
            }
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items !== this.state.items) {
            try {
                localStorage.setItem('items', JSON.stringify(this.state.items));
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        }
    }

    componentDidCatch(error, info) {
        console.error('Error caught by componentDidCatch:', error, info);
        this.setState({ error });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            currentItem: { ...prevState.currentItem, [name]: value }
        }));
    }

    addItem = (e) => {
        e.preventDefault();
        const { items, currentItem } = this.state;
        if (currentItem.name.trim()) {
            const newItem = { ...currentItem, id: Date.now().toString() };
            this.setState({
                items: [...items, newItem],
                currentItem: { id: '', name: '' }
            });
        }
    }

    updateItem = (id) => {
        const newName = prompt('Enter new name:');
        if (newName !== null) {
            this.setState(prevState => ({
                items: prevState.items.map(item => 
                    item.id === id ? { ...item, name: newName } : item
                )
            }));
        }
    }

    deleteItem = (id) => {
        this.setState(prevState => ({
            items: prevState.items.filter(item => item.id !== id)
        }));
    }

    render() {
        const { items, currentItem, isLoading, error } = this.state;

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        return (
            <div>
                <h1>CRUD with Lifecycle Methods</h1>
                <form onSubmit={this.addItem}>
                    <input 
                        type="text" 
                        name="name" 
                        value={currentItem.name}
                        onChange={this.handleInputChange}
                        placeholder="Enter item name"
                    />
                    <button type="submit">Add Item</button>
                </form>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name}
                            <button onClick={() => this.updateItem(item.id)}>Update</button>
                            <button onClick={() => this.deleteItem(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default CRUDLifecycle;