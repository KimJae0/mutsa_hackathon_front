import React, { useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup } from 'react-bootstrap';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ResultList from '../components/ResultList';
import ModalForm from '../components/ModalForm';
import './DbSearch.css';

function DbSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState('영양소');
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/${selectedTab === '영양소' ? 'foods' : 'trash'}`, {
                params: { query: searchTerm },
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handleShowModal = () => {
        setError('');
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedTab === '영양소') {
            if (!name || !calories || !carbs || !protein || !fat) {
                setError('모든 필수 입력란을 작성해주세요.');
                return;
            }
            if (isNaN(calories) || isNaN(carbs) || isNaN(protein) || isNaN(fat)) {
                setError('칼로리, 탄수화물, 단백질, 지방은 숫자여야 합니다.');
                return;
            }
            const foodData = { name, calories: parseInt(calories), carbs: parseInt(carbs), protein: parseInt(protein), fat: parseInt(fat), description };
            try {
                const response = await axios.post('http://localhost:5000/api/foods', foodData);
                console.log('Food saved:', response.data);
                setShowModal(false);
                setName('');
                setCalories('');
                setCarbs('');
                setProtein('');
                setFat('');
                setDescription('');
            } catch (error) {
                console.error('Error saving food:', error);
            }
        } else {
            if (!name || !type || !weight) {
                setError('모든 필수 입력란을 작성해주세요.');
                return;
            }
            if (isNaN(weight)) {
                setError('무게는 숫자여야 합니다.');
                return;
            }
            const trashData = { name, type, weight: parseInt(weight) };
            try {
                const response = await axios.post('http://localhost:5000/api/trash', trashData);
                console.log('Trash saved:', response.data);
                setShowModal(false);
                setName('');
                setType('');
                setWeight('');
            } catch (error) {
                console.error('Error saving trash:', error);
            }
        }
    };

    return (
        <div className="db-search-container">
            <Header />
            <div className="content">
                <div className="left-panel">
                    <ButtonGroup vertical className="button-group">
                        <Button
                            variant={selectedTab === '영양소' ? 'primary' : 'secondary'}
                            onClick={() => setSelectedTab('영양소')}
                        >
                            영양소
                        </Button>
                        <Button
                            variant={selectedTab === '쓰레기' ? 'primary' : 'secondary'}
                            onClick={() => setSelectedTab('쓰레기')}
                        >
                            쓰레기
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="main-panel">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        handleShowModal={handleShowModal}
                        selectedTab={selectedTab}
                    />
                    <ResultList searchResults={searchResults} selectedTab={selectedTab} />
                </div>
            </div>
            <ModalForm
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleSubmit={handleSubmit}
                error={error}
                name={name}
                setName={setName}
                calories={calories}
                setCalories={setCalories}
                carbs={carbs}
                setCarbs={setCarbs}
                protein={protein}
                setProtein={setProtein}
                fat={fat}
                setFat={setFat}
                description={description}
                setDescription={setDescription}
                type={type}
                setType={setType}
                weight={weight}
                setWeight={setWeight}
                selectedTab={selectedTab}
            />
        </div>
    );
}

export default DbSearch;
