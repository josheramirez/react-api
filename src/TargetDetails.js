import { useParams } from "react-router";

const TargetDetails = () => {
    const {id} = useParams(); 
    return(
        <div className="target_details">
            <h2>Target Details</h2>
            {id}
        </div>
    )
}
export default TargetDetails;
