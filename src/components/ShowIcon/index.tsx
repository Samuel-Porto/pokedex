import React from "react";

interface ShowCardProps {Icon: any, size?: number};

const ShowIcon: React.FC<ShowCardProps> = ({Icon, size}) => {
    return ( <>
    {//@ts-ignore
        <Icon size={size? size: 12} />
    }
    </> );
}

export default ShowIcon;