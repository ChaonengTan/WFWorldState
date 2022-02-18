import { useQuery } from '@apollo/client'
import GetWorldState from '../../functions/queries/WorldStateQuery'
import parseTime from '../parseTime';
import './WFWorldState.css';

function WFWorldState() {
    const { data: earthData } = useQuery(GetWorldState, { variables: { location: 'earthCycle'}, pollInterval: 1000 })
    const { data: cetusData } = useQuery(GetWorldState, { variables: { location: 'cetusCycle'}, pollInterval: 1000 })
    const { data: vallisData } = useQuery(GetWorldState, { variables: { location: 'vallisCycle'}, pollInterval: 1000 })
    const { data: cambionData } = useQuery(GetWorldState, { variables: { location: 'cambionCycle'}, pollInterval: 1000 })
    return (
        <div>
            {earthData && cetusData && vallisData && cambionData ?
            <div className="wfWorldState">
                <div className='earth'>
                    <div>
                        <div>Earth | {earthData.getWorldstate.state}</div>
                        {parseTime(earthData.getWorldstate.timeLeft)}
                    </div>
                    <div>
                        <div>Cetus | {cetusData.getWorldstate.state}</div>
                        {parseTime(cetusData.getWorldstate.timeLeft)}
                    </div>
                </div>
                <div className='vallis'>
                    <div>Orb Vallis | {vallisData.getWorldstate.state}</div>
                    {parseTime(vallisData.getWorldstate.timeLeft)}
                </div>
                <div className='cambion'>
                    <div>Cambion Drift | {cambionData.getWorldstate.active}</div>
                    {parseTime(cambionData.getWorldstate.timeLeft)}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default WFWorldState;
