import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Spinner,
    Container,
    Row,
} from 'reactstrap';
import axios from 'axios';
import Photo from './Photo';
import './App.css';

function Photos() {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [startingPage, setStartingPage] = useState(1);
    const [currentEndingPage, setCurrentEndingPage] = useState(10);
    const [photoDetails, setPhotoDetails] = useState([]);
    const [pagesPerpage, setPagesPerPage] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://jsonplaceholder.typicode.com/albums/${currentPage}/photos`
            )
            .then((res) => {
                setPhotoDetails(res.data);
                setLoading(false);
            });
    }, [currentPage]);

    const getPagesNo = (start, end) => {
        const pages = [];
        for (let i = start; i <= end; i += 1) {
            if (i <= 100 && i >= 0) {
                pages.push(i);
            }
        }
        setPagesPerPage(pages);
    };

    const firstPage = () => {
        getPagesNo(1, 10);
    };
    const lastPage = () => {
        getPagesNo(91, 100);
    };
    const NextPage = () => {
        setStartingPage(startingPage + 10);
        setCurrentEndingPage(currentEndingPage + 10);
        getPagesNo(startingPage + 10, currentEndingPage + 10);
    };
    const previousPage = () => {
        setStartingPage(startingPage - 10);
        setCurrentEndingPage(currentEndingPage - 10);
        getPagesNo(startingPage - 10, currentEndingPage - 10);
    };
    const ActivePageNumber = (pageno) => {
        setCurrentPage(pageno);
        setLoading(true);
        axios
            .get(
                `https://jsonplaceholder.typicode.com/albums/${currentPage}/photos`
            )
            .then((res) => {
                setPhotoDetails(res.data);
                setLoading(false);
            });
    };

    return (
        <div className="card-conatiner">
            <h1 className="heading">Gallery</h1>
            <div className="data-conatiner">
                {loading ? (
                    <Spinner>Loading...</Spinner>
                ) : (
                    <Container fluid="xl">
                        <Row>
                            {photoDetails.map((val) => (
                                <Photo albumdata={val} />
                            ))}
                        </Row>
                    </Container>
                )}
                <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                    <Pagination>
                        <PaginationItem onClick={() => firstPage()}>
                            <PaginationLink first href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                previous
                                onClick={() => previousPage()}
                            />
                        </PaginationItem>
                        {pagesPerpage.map((number) => (
                            <PaginationItem
                                onClick={() => ActivePageNumber(number)}
                            >
                                <PaginationLink href="#">
                                    {number}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                next
                                onClick={() => NextPage()}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                last
                                onClick={() => lastPage()}
                            />
                        </PaginationItem>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
export default Photos;
