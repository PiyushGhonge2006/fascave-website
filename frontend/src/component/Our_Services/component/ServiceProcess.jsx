import { useEffect, useState } from 'react'
import './serviceprocess.css'

const PROCESS_STEPS = [
    {
        title: 'Your journey',
        subtitle: 'starts here',
        icon: '⚑',
    },
    {
        title: 'Discovery &',
        subtitle: 'Strategy',
        icon: '⌕',
    },
    {
        title: 'Solution',
        subtitle: 'Architecture',
        icon: '▦',
    },
    {
        title: 'Experience',
        subtitle: 'Design',
        icon: '◈',
    },
    {
        title: 'Development &',
        subtitle: 'QA',
        icon: '</>',
    },
    {
        title: 'Deployment',
        subtitle: '',
        icon: '↗',
    },
    {
        title: 'Enablement &',
        subtitle: 'Support',
        icon: '⚙',
    },
    {
        title: 'Live, supported',
        subtitle: '& evolving',
        icon: '✓',
    },
]

export default function ServiceProcess() {

    const [activeStep, setActiveStep] = useState(-1)

    useEffect(() => {

        let step = -1

        const interval = setInterval(() => {

            step += 1

            if (step >= PROCESS_STEPS.length) {
                step = -1
            }

            setActiveStep(step)

        }, 900)

        return () => clearInterval(interval)

    }, [])


    const progress =
        activeStep < 0
            ? 0
            : (activeStep / (PROCESS_STEPS.length - 1)) * 100


    return (
        <section className="service-process">

            <div className="process-container">

                {/* HEADER */}

                <div className="process-header">

                    <span className="process-eyebrow">
                        HOW WE WORK
                    </span>

                    <h2>
                        A transparent delivery process —
                        <br />
                        from planning to production.
                    </h2>

                    <p>
                        From the first conversation to long after launch,
                        every engagement follows one visible path — clear
                        milestones, honest updates, and a team accountable
                        at every single step.
                    </p>

                </div>


                {/* TIMELINE */}

                <div
                    className="process-timeline"
                    style={{
                        '--process-progress': `${progress}%`,
                    }}
                >

                    {/* RAIL TRACK */}

                    <div className="process-track">

                        <div className="process-rail process-rail-top" />

                        <div className="process-rail process-rail-bottom" />

                        <div className="process-sleepers" />

                        <div className="process-progress" />

                    </div>


                    {/* STEPS */}

                    <div className="process-steps">

                        {PROCESS_STEPS.map((step, index) => {

                            const isActive =
                                index <= activeStep

                            return (
                                <div
                                    className={`process-step ${isActive
                                            ? 'is-active'
                                            : ''
                                        }`}
                                    key={`${step.title}-${index}`}
                                >

                                    {/* TEXT */}

                                    <div className="process-step-text">

                                        <strong>
                                            {step.title}
                                        </strong>

                                        {step.subtitle && (
                                            <span>
                                                {step.subtitle}
                                            </span>
                                        )}

                                    </div>


                                    {/* NODE */}

                                    <div className="process-node">

                                        <span className="process-icon">
                                            {step.icon}
                                        </span>

                                        <span className="process-node-glow" />

                                    </div>

                                </div>
                            )
                        })}

                    </div>

                </div>

            </div>

        </section>
    )
}