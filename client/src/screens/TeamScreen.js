import React, { useEffect } from 'react';
import TeamHero from '../components/TeamHero';
import TeamMembers from '../components/TeamMembers';
import TeamAbout from '../components/TeamAbout';
import TeamFAQ from '../components/TeamFAQ';
import InstagramSection from '../components/InstagramSection';

const TeamScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="team-screen">
            <TeamHero />
            <TeamMembers />
            <TeamAbout />
            <TeamFAQ />
            <InstagramSection />
        </div>
    );
};

export default TeamScreen;
