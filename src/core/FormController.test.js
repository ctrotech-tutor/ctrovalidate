import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FormController } from './FormController.js';
import { Logger, LogLevel } from '../utils/Logger.js';

describe('FormController', () => {
  let form;
  let logger;
  let validationHandler;
  let controller;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="test-form">
        <input type="text" name="username" data-ctrovalidate-rules="required">
        <input type="text" name="age" data-ctrovalidate-rules="numeric|min:18">
        <input type="checkbox" name="hasPet" id="hasPet">
        <input type="text" name="petName" data-ctrovalidate-rules="required" data-ctrovalidate-if="hasPet:checked">
      </form>
    `;
    form = document.getElementById('test-form');
    logger = new Logger(LogLevel.NONE);
    validationHandler = vi.fn();
    controller = new FormController(form, { logger, validationHandler });
  });

  it('should discover fields with data-ctrovalidate-rules attribute', () => {
    controller.discoverFields();
    expect(controller.getFields().length).toBe(3);
  });

  it('should add a field dynamically', () => {
    const newInput = document.createElement('input');
    newInput.name = 'dynamic';
    newInput.setAttribute('data-ctrovalidate-rules', 'required');
    form.appendChild(newInput);

    controller.addField(newInput);
    expect(controller.getFields().length).toBe(1);
    expect(controller.getFields()[0].element).toBe(newInput);
  });

  it('should not add duplicate fields', () => {
    const input = form.querySelector('[name="username"]');
    controller.addField(input); // Already added by discoverFields potentially
    // Wait, discoverFields clears first. Let's add manually.
    controller.addField(input);
    const count = controller.getFields().length;
    controller.addField(input);
    expect(controller.getFields().length).toBe(count);
  });

  it('should not add a field without data-ctrovalidate-rules', () => {
    const newInput = document.createElement('input');
    newInput.name = 'no-rules';
    form.appendChild(newInput);

    controller.addField(newInput);
    expect(controller.getFields().length).toBe(0);
  });

  it('should remove a field dynamically', () => {
    controller.discoverFields();
    const username = form.querySelector('[name="username"]');
    controller.removeField(username);
    expect(controller.getFields().length).toBe(2);
  });

  it('should handle blur event and call validationHandler', () => {
    controller.discoverFields();
    controller.attachEventListeners(true);

    const username = form.querySelector('[name="username"]');
    username.dispatchEvent(new Event('blur'));

    expect(validationHandler).toHaveBeenCalled();
  });

  it('should handle input event if field is dirty', () => {
    controller.discoverFields();
    controller.attachEventListeners(true);

    const username = form.querySelector('[name="username"]');
    const fieldObject = controller
      .getFields()
      .find((f) => f.element === username);

    // Not dirty yet, input should not trigger handler
    username.dispatchEvent(new Event('input'));
    expect(validationHandler).not.toHaveBeenCalled();

    // Mark as dirty (like blur does)
    fieldObject.state.isDirty = true;
    username.dispatchEvent(new Event('input'));
    expect(validationHandler).toHaveBeenCalled();
  });

  it('should handle dependencies', () => {
    controller.discoverFields();
    controller.attachEventListeners(true);

    const hasPet = form.querySelector('[name="hasPet"]');

    hasPet.dispatchEvent(new Event('input'));
    expect(validationHandler).toHaveBeenCalled(); // Triggered by dependency controller change
  });

  it('should parse dependency strings correctly', () => {
    const input = document.createElement('input');
    input.setAttribute('data-ctrovalidate-rules', 'required');
    input.setAttribute('data-ctrovalidate-if', 'ctrl:value=foo');
    controller.addField(input);

    const field = controller.getFields()[0];
    expect(field.dependency).toEqual({
      controllerName: 'ctrl',
      type: 'value',
      value: 'foo',
    });
  });

  it('should handle "present" dependency type', () => {
    const input = document.createElement('input');
    input.setAttribute('data-ctrovalidate-rules', 'required');
    input.setAttribute('data-ctrovalidate-if', 'ctrl:present');
    controller.addField(input);
    const field = controller.getFields()[0];
    expect(field.dependency.type).toBe('present');
  });

  it('should return null for malformed dependency strings', () => {
    const input = document.createElement('input');
    input.setAttribute('data-ctrovalidate-rules', 'required');

    input.setAttribute('data-ctrovalidate-if', ':checked'); // No controller name
    controller.addField(input);
    expect(
      controller.getFields().find((f) => f.element === input).dependency
    ).toBeNull();
  });

  it('should log warning if dependency controller is not found', () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const input = document.createElement('input');
    input.setAttribute('data-ctrovalidate-rules', 'required');
    input.setAttribute('data-ctrovalidate-if', 'nonExistent:checked');
    controller.addField(input, true);

    expect(warnSpy).toHaveBeenCalledWith(
      'FormController',
      'Could not find controller field with name "nonExistent".'
    );
    warnSpy.mockRestore();
  });

  it('should disable real-time validation if requested', () => {
    const infoSpy = vi.spyOn(logger, 'info').mockImplementation(() => {});
    controller.attachEventListeners(false);
    expect(infoSpy).toHaveBeenCalledWith(
      'FormController',
      'Real-time validation is disabled.'
    );
    infoSpy.mockRestore();
  });

  it('should return early in removeField if field is not tracked', () => {
    const debugSpy = vi.spyOn(logger, 'debug').mockImplementation(() => {});
    const unrecordedInput = document.createElement('input');

    controller.removeField(unrecordedInput);
    expect(debugSpy).not.toHaveBeenCalled();
    debugSpy.mockRestore();
  });

  it('should handle errors in removeEventListener gracefully', () => {
    controller.discoverFields();
    controller.attachEventListeners(true);
    const username = form.querySelector('[name="username"]');

    // Mock removeEventListener to throw
    username.removeEventListener = vi.fn().mockImplementation(() => {
      throw new Error('Detach error');
    });

    const debugSpy = vi.spyOn(logger, 'debug').mockImplementation(() => {});
    controller.removeField(username);

    // Check if the catch block was hit via logger.debug
    expect(debugSpy).toHaveBeenCalledWith(
      'FormController',
      'Error while removing listeners for',
      username,
      expect.any(Error)
    );
    debugSpy.mockRestore();
  });
});
