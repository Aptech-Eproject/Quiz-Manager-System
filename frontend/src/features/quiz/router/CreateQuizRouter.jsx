import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import CreateStepOne from "../pages/CreateStepOne";
import CreateStepTwo from "../pages/CreateStepTwo";

export default function CreateQuizRouter() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    return (
        <>
            <Routes>
                <Route
                    path='/step-1'
                    element={
                        <CreateStepOne
                            title={title}
                            setTitle={setTitle}
                        />}

                />
                <Route
                    path='/step-2'
                    element={
                        <CreateStepTwo
                            category={category}
                            setCategory={setCategory}
                        />}
                />
            </Routes>
        </>
    )
}
