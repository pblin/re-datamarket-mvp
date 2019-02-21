export enum APP_ACTIONS {
  UPDATE_PROFILE_MENU_OPEN = "UPDATE_PROFILE_MENU_OPEN "
}

export function updateProfileMenuOpen(isOpen: boolean) {
  console.log('CALLING UPDATE PROFILE MENU OPEN ACTION');
  return {type: APP_ACTIONS.UPDATE_PROFILE_MENU_OPEN, isOpen};
}
