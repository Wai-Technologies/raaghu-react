import React, { useEffect , useState} from "react";
import { Player } from '@lottiefiles/react-lottie-player';

export interface RdsAnimationProps {
    iconPath?: string;
    width?: string;
    height?: string;
    strokeWidth?: string;
    classes?: any;
    dataTestId?: string;
    isHover?: boolean 
}


const RdsAnimation = (props: RdsAnimationProps) => {
    //Set default icon animation when path is not available.
    const path = props.iconPath ? props.iconPath : './puzzle.json';
    const lottie: any = {};
    const [player, setPlayer] = useState(lottie);

    useEffect(() => {
        if(player.play && player.stop){
            if(props.isHover){
                player?.play();
           }else {
                player?.stop();
           }
        }
    }, [props.isHover, player]);

    const style = {
        height: props.height ? props.height : '30px',
        width: props.width ? props.width : '30px',
        'strokeWidth': props.strokeWidth ? props.strokeWidth : 'inherit',     
           
    }
    return (
        <Player controls={true}
            speed={3}
            lottieRef={instance => {setPlayer(instance) }}
            src={path}
            autoplay={false}
            hover
            loop 
            style={style} 
        />
    );
};

export default RdsAnimation;


