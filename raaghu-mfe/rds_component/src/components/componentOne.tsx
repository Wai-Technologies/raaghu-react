import {AuthGuard} from '../../../libs/public.api' 

const ComponentOne = () => {

	return (   
         <div>
            <AuthGuard></AuthGuard>
			 <p>component one</p>
		 </div>
	);
};

export default ComponentOne;

// first component