import {FileUpload} from "./FileUpload";
import {shallow} from "enzyme";
import * as React from "react";

//TODO: CREATE SETUP FILE
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("<FileUpload></FileUpload>", () => {
  //TODO: Setup before each
  it("Renders the file upload component", () => {
      const wrapper = shallow(
        <FileUpload fileId={'1234'} onFileChange={()=>{}} displayUpload={true} fileTypes={['.json']} upload={()=>{}}/>
      );
      expect(wrapper).toBeTruthy();
      expect(wrapper.find('.file-input-label').text()).toBe('Or Select A File To Upload');
  });


  it("Handles file drop with wrong filetype", () => {
    const wrapper = shallow(
      <FileUpload fileId={'1234'} onFileChange={()=>{}} displayUpload={true} fileTypes={['.json']} upload={()=>{}}/>
    );
    expect(wrapper).toBeTruthy();

    //TODO: Spy on this
    const mockEvent = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: {
        files: [
          {name: 'test', type: '.json'}
        ]
      }
    };
    //@ts-ignore
    wrapper.instance().handleDrop(mockEvent);
  });
});
