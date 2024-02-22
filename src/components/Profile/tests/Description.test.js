import {create} from "react-test-renderer";
import Descriptions from "../Description/Descriptions";


describe("Description status test", () => {
    test("Status should be updated in the state", () => {
        const component = create(<Descriptions profileStatus={'123'}/>);
        const instance = component.root;
        expect(instance.props.status).toBe('123');
    });
});