import React, { useState } from 'react';

var userRole = ""
export function getRole() {
    return userRole;
}
export function setRole(role) {
    userRole = role;
}
