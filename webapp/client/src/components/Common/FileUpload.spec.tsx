import {FileUpload} from "./FileUpload";
import {shallow} from "enzyme";
import * as React from "react";

//TODO: CREATE SETUP FILE
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("<FileUpload></FileUpload>", () => {
  let wrapper, mockParent;

  beforeEach(() => {
    mockParent = {
      onFileChange: jest.fn()
    };
    wrapper = shallow(
      <FileUpload fileId={'1234'} onFileChange={mockParent.onFileChange} displayUpload={true} fileTypes={['.json']} upload={()=>{}}/>
    );
  });

  it("Renders the file upload component", () => {
      expect(wrapper).toBeTruthy();
      expect(wrapper.find('.file-input-label').text()).toBe('Or Select A File To Upload');
  });


  it("Handles file drop with wrong filetype", () => {
    const mockEvent = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: {
        files: [
          {name: 'test', type: '.txt'}
        ]
      }
    };

    const preventDefaultSpy = jest.spyOn(mockEvent, "preventDefault");
    const stopPropagationSpy = jest.spyOn(mockEvent, "stopPropagation");

    //@ts-ignore
    wrapper.instance().handleDrop(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it("Handles file drop with correct filetype", () => {
    const mockEvent = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: {
        files: [
          {name: 'test', type: '.json'}
        ]
      }
    };

    const preventDefaultSpy = jest.spyOn(mockEvent, "preventDefault");
    const stopPropagationSpy = jest.spyOn(mockEvent, "stopPropagation");
    const fileChangeSpy = jest.spyOn(mockParent, 'onFileChange');

    //@ts-ignore
    wrapper.instance().handleDrop(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(fileChangeSpy).toHaveBeenCalled();
  });
});
