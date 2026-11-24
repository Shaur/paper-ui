import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SeriesItemView from "./series/SeriesItemView";
import ReaderView from "./reader/ReaderView";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<App/>}/>
                <Route path="/series/:id" element={<SeriesItemView/>}/>
                <Route path="/reader/:id" element={<ReaderView/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
