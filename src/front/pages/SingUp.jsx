import React from "react";

const SingUp = () => {

    return(
        <div className="container m-auto p-5 bg-body h-full d-flex justify-content-center align-items-center">


        <div className="col-xl-6">
            <div className="card" style={{height: "auto"}}>
                <div className="card-body">
                    <form novalidate="" class=""><div class="mb-3"><label class="form-label" for="validationCustom01">First name</label><input required="" placeholder="First name" id="validationCustom01" class="form-control" type="text" value="Mark"/><div class="valid-feedback">Looks good!</div></div><div class="mb-3"><label class="form-label" for="validationCustom02">Last name</label><input required="" placeholder="Last name" id="validationCustom02" class="form-control" type="text" value="Otto"/><div class="valid-feedback">Looks good!</div></div><div class="mb-3"><label class="form-label" for="validationCustomUsername">Username</label><div class="input-group has-validation"><span class="input-group-text" id="inputGroupPrepend">@</span><input placeholder="Username" aria-describedby="inputGroupPrepend" required="" id="validationCustomUsername" class="form-control" type="text"/><div class="invalid-feedback">Please choose a username.</div></div></div><div class="mb-3"><label class="form-label" for="validationCustom03">City</label><input placeholder="City" required="" id="validationCustom03" class="form-control" type="text"/><div class="invalid-feedback">Please provide a valid city.</div></div><div class="mb-3"><label class="form-label" for="validationCustom04">State</label><input placeholder="State" required="" id="validationCustom04" class="form-control" type="text"/><div class="invalid-feedback">Please provide a valid state.</div></div><div class="mb-3"><label class="form-label" for="validationCustom05">Zip</label><input placeholder="Zip" required="" id="validationCustom05" class="form-control" type="text"/><div class="invalid-feedback">Please provide a valid zip.</div></div><div class="mb-3"><div class="form-check"><input required="" class="form-check-input" type="checkbox"/><label title="" class="form-check-label">Agree to terms and conditions</label><div class="valid-feedback">You must agree before submitting.</div></div></div><button type="submit" class="btn btn-primary">Submit form</button></form>
                </div>
            </div>
        </div>
        </div>

    )
}

export default SingUp