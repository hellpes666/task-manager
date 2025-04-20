import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const MainPage = () => {
    const animationOnXAxis = (translateX: number, delay: number) => ({
        initial: {
            x: translateX,
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,
        },
        transition: {
            type: 'spring',
            stiffness: 60,
            damping: 12,
            delay,
        },
    });

    return (
        <div className="hero bg-base-200 min-h-[90vh] rounded-xl">
            <div className="hero-content text-center">
                <div className="max-w-md space-y-6">
                    <motion.h1
                        className="text-5xl font-bold will-change-transform"
                        {...animationOnXAxis(-50, 0.3)}
                    >
                        Hello there
                    </motion.h1>

                    <motion.p
                        className="text-lg leading-relaxed will-change-transform"
                        {...animationOnXAxis(30, 0.5)}
                    >
                        Really good Task Manager for YOUR team.
                        <br />
                        <strong className="text-accent">
                            Advanced UX/UI design
                        </strong>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            type: 'spring',
                            delay: 0.9,
                        }}
                        className="inline-block"
                    >
                        <Link
                            to="/task-managment"
                            className="btn btn-primary px-6 py-3 text-base"
                        >
                            Create First Task
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
