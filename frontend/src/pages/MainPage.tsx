import React from 'react';
import { Link } from 'react-router-dom';

export const MainPage = () => {
    return (
        <div className="hero bg-base-200 min-h-[90vh] rounded-xl">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        Really good Task Manager for YOUR team.
                        <br />
                        <strong className="text-accent">
                            Advanced UX/UI design
                        </strong>
                    </p>
                    <Link className="btn btn-primary" to="/task-managment">
                        Create First Task
                    </Link>
                </div>
            </div>
        </div>
    );
};
