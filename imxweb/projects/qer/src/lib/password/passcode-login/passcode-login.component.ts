/*
 * ONE IDENTITY LLC. PROPRIETARY INFORMATION
 *
 * This software is confidential.  One Identity, LLC. or one of its affiliates or
 * subsidiaries, has supplied this software to you under terms of a
 * license agreement, nondisclosure agreement or both.
 *
 * You may not copy, disclose, or use this software except in accordance with
 * those terms.
 *
 *
 * Copyright 2023 One Identity LLC.
 * ALL RIGHTS RESERVED.
 *
 * ONE IDENTITY LLC. MAKES NO REPRESENTATIONS OR
 * WARRANTIES ABOUT THE SUITABILITY OF THE SOFTWARE,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT.  ONE IDENTITY LLC. SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE
 * AS A RESULT OF USING, MODIFYING OR DISTRIBUTING
 * THIS SOFTWARE OR ITS DERIVATIVES.
 *
 */

import { Component, OnInit } from "@angular/core";
import { CaptchaService, AuthenticationService, imx_SessionService, UserMessageService } from 'qbm';
import { Router } from '@angular/router';
import { QerApiService } from "../../qer-api-client.service";
import { EuiLoadingService } from "@elemental-ui/core";
import { OverlayRef } from "@angular/cdk/overlay";

@Component({
	templateUrl: "./passcode-login.component.html",
	styleUrls: ["./passcode-login.component.scss"]
})
export class PasscodeLoginComponent implements OnInit {
	constructor(private readonly authService: AuthenticationService,
		private readonly qerApiService: QerApiService,
		private readonly session: imx_SessionService,
		private router: Router,
		private readonly busyService: EuiLoadingService,
		private readonly messageSvc: UserMessageService,
		public readonly captchaSvc: CaptchaService) { }

	public ngOnInit(): void {
	}

	userName = "";

	isButtonDisabled = true;

	isButtonDisabled2 = true;

	lastFourDigits = "";

	phoneNumber = "";

	url = "192.168.88.92";

	passcode = "";

	public isEnteringPasscode = false;

	public isEnteringUsernameAndPassword = false;

	async CheckNumber(): Promise<void>{
		let overlayRef: OverlayRef;
		setTimeout(() => overlayRef = this.busyService.show());
		let sessionCookie;

		if (window.location.hostname === 'srv-im1') {
			this.url = "srv-im1";
		}

		const url1 = `https://${this.url}/ApiServer/imx/login/portal/RoleBasedPerson`;
		const body = JSON.stringify({
			User: "KRNEKI756747",
			Password: "Geslo123."
		});

		const xsrfToken = document.cookie
			.split('; ')
			.find(cookie => cookie.startsWith('XSRF-TOKEN='))
			.split('=')[1];

		await fetch(url1, {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
						'X-XSRF-TOKEN': xsrfToken
				},
				body: body
		})
		.then(response => {
				if (!response.ok) {
						throw new Error('Network response was not ok (POST log in with XSRF)');
				}
				return response.json();
		})
		.then(data => {
				const name = 'imx-session-portal';
				const cookieString = document.cookie;
				const cookies = cookieString.split(';');
				for (let i = 0; i < cookies.length; i++) {
						const cookie = cookies[i].trim();
						if (cookie.startsWith(name + '=')) {
								sessionCookie = cookie.substring(name.length + 1);
						}
				}
		})
		.catch(error => {
				console.error('There was a problem with the fetch operation (POST log in with XSRF):', error);
		});

		setTimeout(() => {
			fetch(`https://${this.url}/ApiServer/imx/ping`, {
						method: 'GET',
					}).then(response => {
							if (!response.ok) {
									throw new Error('Network response was not ok (GET ping)');
							}
							return response.json();
					})
					.then(data => {
							const url = `https://${this.url}/ApiServer/portal/person/all?PageSize=500000000`;
							fetch(url, {
								method: 'GET',
								headers: 
								{
									'Cookie': `XSRF-TOKEN=${xsrfToken}; imx-session-portal=${sessionCookie}`,
									'Content-Type': 'application/json'
								}
							})
								.then(response => {
									if (!response.ok) {
											throw new Error('Network response was not ok (GET all users)');
									}
									return response.json();
				})
				.then(data => {
				if (this.userName !== "") {
					const employee = data.Entities.find(entity => {
						const userNameStartIndex = entity.Display.lastIndexOf('(') + 1;
						const userNameEndIndex = entity.Display.lastIndexOf(')');
						const userName = entity.Display.substring(userNameStartIndex, userNameEndIndex);
						return userName === this.userName;
					});
				
					let employeeUID;
	
					if (employee) {
							 employeeUID = employee.Keys[0];
					} else {
							console.log("Employee not found");
					}
					fetch(`https://${this.url}/ApiServer/portal/person/uid/${employeeUID}`, {
						method: 'GET',
						headers: 
									{
										'Authorization': `Bearer ${sessionCookie}`,
										'Content-Type': 'application/json'
									}
					}).then(response => {
							if (!response.ok) {
									throw new Error('Network response was not ok (GET User data using UID)');
							}
							return response.json();
					})
					.then(data => {
							const phoneMobile = data.Entities[0].Columns.PhoneMobile.Value;
							this.phoneNumber = phoneMobile;
							if (this.lastFourDigits !== "" && this.lastFourDigits.length == 4 && this.phoneNumber.endsWith(this.lastFourDigits)) {
								console.log("The Phone Number is correct");

								const url3 = `https://${this.url}/ApiServer/portal/person/passcode/${employeeUID}`;

								const requestBody = {};

								const requestOptions = {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
										'X-XSRF-TOKEN': xsrfToken
									},
									body: JSON.stringify(requestBody)
								};
								fetch(url3, requestOptions)
									.then(response => {
										if (!response.ok) {
											throw new Error('Network response was not ok');
										}
										return response.json();
									})
									.then(data => {
										console.log('Passcode generated:', data.PassCode);
										const url1 = `https://${this.url}/ApiServer/imx/logout/portal`;
										const body = JSON.stringify({
										});

										const xsrfToken = document.cookie
											.split('; ')
											.find(cookie => cookie.startsWith('XSRF-TOKEN='))
											.split('=')[1];

										fetch(url1, {
												method: 'POST',
												headers: {
														'Content-Type': 'application/json',
														'X-XSRF-TOKEN': xsrfToken
												},
												body: body
										})
										.then(response => {
												if (!response.ok) {
														throw new Error('Network response was not ok (POST log out with XSRF)');
												}
												return response.json();
										})
										.then(data => {
										})
										.catch(error => {
												console.error('There was a problem with the fetch operation (POST log out with XSRF):', error);
										});
										setTimeout(() => this.busyService.hide(overlayRef));
										this.isButtonDisabled = false;
									})
									.catch(error => {
										console.error('Error:', error);
									});
							} else
									console.log("Phone number not found");
					})
					.catch(error => {
							console.error('There was a problem with the fetch operation (GET User data using UID):', error);
					});
				}
				else
					console.log("Username is empty");
		})
				.catch(error => {
				console.error('There was a problem with the fetch operation (GET all users):', error);
		});
					})
					.catch(error => {
							console.error('There was a problem with the fetch operation (GET ping):', error);
					});
		}, 500);
	}

	async MoveToEnterPasscode(noResetMessage?: boolean): Promise<void> {

		if (!noResetMessage) {
			// reset the error message
			this.messageSvc.subject.next(undefined);
		}

		let overlayRef: OverlayRef;
		setTimeout(() => overlayRef = this.busyService.show());
		try {
			// use response code
			// const resp = this.captchaSvc.Response;
			// this.captchaSvc.Response = "";

			// // use this API call to set the CAPTCHA on the server side
			// await this.qerApiService.client.passwordreset_passwordquestions_account_post({
			// 	AccountName: this.userName,
			// 	Code: resp
			// });

			this.passcode = "";
			this.isEnteringPasscode = true;
		} catch (e) {
			throw e;
		} finally {
			this.captchaSvc.ReinitCaptcha();
			setTimeout(() => this.busyService.hide(overlayRef));
		}
	}

	async MoveToEnterUsernameAndPassword(noResetMessage?: boolean): Promise<void> {

		if (!noResetMessage) {
			// reset the error message
			this.messageSvc.subject.next(undefined);
		}

		let overlayRef: OverlayRef;
		setTimeout(() => overlayRef = this.busyService.show());
		try {
			// let headers = new Headers();

			// // use response code
			// const resp = this.captchaSvc.Response;
			// this.captchaSvc.Response = "";

			// use this API call to set the CAPTCHA on the server side
			
			// await this.qerApiService.client.passwordreset_passwordquestions_account_post({
			// 	AccountName: this.userName,
			// 	Code: resp
			// });

			this.passcode = "";
			this.userName = "";
			this.isEnteringUsernameAndPassword = true;
			this.userName = "";
		} catch (e) {
			throw e;
		} finally {
			this.captchaSvc.ReinitCaptcha();
			setTimeout(() => this.busyService.hide(overlayRef));
		}
	}

	public async Login(): Promise<void> {
		// reset the error message
		this.messageSvc.subject.next(undefined);
		let overlayRef: OverlayRef;
		setTimeout(() => overlayRef = this.busyService.show());
		try {
			const newSession = await this.session.login({
				__Product: "PasswordReset",
				Module: "Passcode",
				User: this.userName,
				Passcode: this.passcode
			});

			if (newSession) {
				await this.authService.processLogin(async () => newSession);
				this.Reset();
				this.router.navigate(['']);
			}
			else {
				this.MoveToEnterPasscode(true);
			}
		} finally {
			setTimeout(() => this.busyService.hide(overlayRef));
		}
	}

	Reset() {
		this.isEnteringPasscode = false;
	}

	public LdsCaptchaInfo = '#LDS#Please enter the characters from the image.';
}
